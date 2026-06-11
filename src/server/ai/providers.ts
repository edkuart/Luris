export type AiProvider = 'disabled' | 'openai' | 'anthropic'

export function getConfiguredAiProvider(): AiProvider {
  const provider = process.env.AI_PROVIDER
  if (provider === 'openai' || provider === 'anthropic') return provider
  return 'disabled'
}
