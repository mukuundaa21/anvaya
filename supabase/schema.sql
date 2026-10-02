-- ANVAYA Schema and RLS Policies

-- 1. Tables
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('buyer', 'seller', 'admin')) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    gst_number TEXT,
    pan_number TEXT,
    verification_status TEXT DEFAULT 'not submitted' CHECK (verification_status IN ('not submitted', 'under review', 'verified', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.inventory_lots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES public.profiles(id),
    name TEXT NOT NULL,
    sku TEXT,
    category TEXT NOT NULL,
    quantity_total INTEGER NOT NULL,
    quantity_available INTEGER NOT NULL,
    quantity_reserved INTEGER DEFAULT 0,
    moq INTEGER NOT NULL,
    lot_size INTEGER,
    asking_price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    condition TEXT,
    age TEXT,
    expiry_date DATE,
    location TEXT NOT NULL,
    brand TEXT,
    packaging TEXT,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'closed', 'sold')),
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lot_id UUID REFERENCES public.inventory_lots(id),
    buyer_id UUID REFERENCES public.profiles(id),
    seller_id UUID REFERENCES public.profiles(id),
    quantity INTEGER NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'countered', 'accepted', 'rejected', 'withdrawn', 'expired')),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RATE LIMITER RPC (Since Edge Functions might fail to deploy)
CREATE TABLE public.login_attempts (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    ip_address TEXT,
    success BOOLEAN NOT NULL,
    attempted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.account_lockouts (
    email TEXT PRIMARY KEY,
    failed_count INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION check_login_lockout(p_email TEXT)
RETURNS JSON AS $$
DECLARE
    v_lockout RECORD;
    v_result JSON;
BEGIN
    SELECT * INTO v_lockout FROM public.account_lockouts WHERE email = p_email;
    IF FOUND AND v_lockout.locked_until IS NOT NULL AND v_lockout.locked_until > NOW() THEN
        RETURN json_build_object('locked', true, 'locked_until', v_lockout.locked_until);
    END IF;
    RETURN json_build_object('locked', false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION record_login_attempt(p_email TEXT, p_ip TEXT, p_success BOOLEAN)
RETURNS VOID AS $$
DECLARE
    v_failed_count INTEGER;
BEGIN
    INSERT INTO public.login_attempts (email, ip_address, success) VALUES (p_email, p_ip, p_success);
    
    IF p_success THEN
        DELETE FROM public.account_lockouts WHERE email = p_email;
    ELSE
        INSERT INTO public.account_lockouts (email, failed_count)
        VALUES (p_email, 1)
        ON CONFLICT (email) DO UPDATE 
        SET failed_count = account_lockouts.failed_count + 1;
        
        SELECT failed_count INTO v_failed_count FROM public.account_lockouts WHERE email = p_email;
        IF v_failed_count >= 10 THEN
            UPDATE public.account_lockouts SET locked_until = NOW() + INTERVAL '30 minutes' WHERE email = p_email;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin can view all profiles" ON public.profiles FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Anyone can view active inventory lots" ON public.inventory_lots FOR SELECT USING (status = 'active');
CREATE POLICY "Sellers can manage their own lots" ON public.inventory_lots FOR ALL USING (auth.uid() = seller_id);
