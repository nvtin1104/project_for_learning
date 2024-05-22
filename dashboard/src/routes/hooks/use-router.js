import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export function useRouter() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href) => navigate(href),
      post: (href, data) => navigate(href, { state: data }),
      replace: (href) => navigate(href, { replace: true }),
    }),
    [navigate]
  );

  return router;
}
