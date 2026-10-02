-- Atomic Reservation Logic
-- 1. Accept an offer
-- 2. Check if quantity is still available
-- 3. Reserve quantity in inventory_lots
-- 4. Create an order in orders table
-- 5. Mark offer as accepted

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    offer_id UUID REFERENCES public.offers(id),
    lot_id UUID REFERENCES public.inventory_lots(id),
    buyer_id UUID REFERENCES public.profiles(id),
    seller_id UUID REFERENCES public.profiles(id),
    quantity INTEGER NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION accept_offer(p_offer_id UUID)
RETURNS JSON AS $$
DECLARE
    v_offer RECORD;
    v_lot RECORD;
    v_order_id UUID;
    v_order_number TEXT;
BEGIN
    -- 1. Lock the offer row
    SELECT * INTO v_offer FROM public.offers WHERE id = p_offer_id FOR UPDATE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Offer not found';
    END IF;
    
    IF v_offer.status != 'pending' AND v_offer.status != 'countered' THEN
        RAISE EXCEPTION 'Offer is not in a valid state to be accepted';
    END IF;

    -- 2. Lock the lot row
    SELECT * INTO v_lot FROM public.inventory_lots WHERE id = v_offer.lot_id FOR UPDATE;
    
    IF v_lot.quantity_available < v_offer.quantity THEN
        RAISE EXCEPTION 'Insufficient quantity available for this lot';
    END IF;

    -- 3. Reserve the quantity atomically
    UPDATE public.inventory_lots 
    SET quantity_available = quantity_available - v_offer.quantity,
        quantity_reserved = quantity_reserved + v_offer.quantity
    WHERE id = v_lot.id;

    -- 4. Mark offer as accepted
    UPDATE public.offers SET status = 'accepted' WHERE id = p_offer_id;

    -- 5. Create Order
    v_order_number := 'ORD-' || to_char(NOW(), 'YYMMDD') || '-' || substring(md5(random()::text) from 1 for 4);
    
    INSERT INTO public.orders (
        order_number, offer_id, lot_id, buyer_id, seller_id, quantity, price_per_unit, total_amount
    ) VALUES (
        v_order_number, p_offer_id, v_lot.id, v_offer.buyer_id, v_offer.seller_id, v_offer.quantity, v_offer.price_per_unit, v_offer.quantity * v_offer.price_per_unit
    ) RETURNING id INTO v_order_id;

    RETURN json_build_object('success', true, 'order_id', v_order_id, 'order_number', v_order_number);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
