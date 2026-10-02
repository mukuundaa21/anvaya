-- Premium Access Requests table
CREATE TABLE IF NOT EXISTS public.premium_access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES auth.users(id),
    UNIQUE(user_id)
);

-- RLS: users can only read/insert their own row
ALTER TABLE public.premium_access_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own premium request"
  ON public.premium_access_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own premium request"
  ON public.premium_access_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can read all
CREATE POLICY "Admins can manage premium requests"
  ON public.premium_access_requests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );
