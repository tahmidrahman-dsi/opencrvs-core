import { getDeathMutationMappings } from './mutations'
import { Action } from 'src/forms'

describe('When calling getDeathQueryMappings', () => {
  it('Should return the Query for certification', () => {
    const query = getDeathMutationMappings(Action.COLLECT_CERTIFICATE)
    expect(query).not.toBe(null)
    if (query && query.dataKey) {
      expect(query.dataKey).toEqual('markDeathAsCertified')
    }
  })

  it('Should return null', () => {
    const query = getDeathMutationMappings(Action.LOAD_REVIEW_APPLICATION)
    expect(query).toBe(null)
  })
})