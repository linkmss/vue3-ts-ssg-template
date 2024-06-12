interface UseAuthMutation {
  mutateAsync: any
}

export function useAuthMutation(): UseAuthMutation {
  return {
    mutateAsync: () => null,
  }
}
