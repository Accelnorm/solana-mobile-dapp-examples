# TODO: Investigate React Query polling interference with Gill transactions

## Issue Description

Counter account polling logs stop appearing after Gill transaction starts.

### Pattern
- Regular 2-second polling works fine until "Incrementing counter by 1" 
- After Gill transaction: No more "Checking counter account" logs appear
- OnChain count IS updated correctly (confirmed via manual account reads)
- Account reading uses web3.js connection.getAccountInfo() - no Gill interference there

## Symptoms

- ✅ Gill transaction completes successfully 
- ✅ OnChain state updates correctly
- ✅ Manual account data deserialization works
- ❌ React Query useQuery polling stops after mutation

## Potential Causes to Investigate

### 1. React Query mutation/query interaction issue
- useMutation might be interfering with useQuery refetchInterval
- Manual counterAccount.refetch() in onSuccess could conflict with polling
- Component re-render cycle disrupting query state

### 2. Mobile Wallet Adapter side effects
- transact() wrapper might affect React context or async state
- Wallet authorization state changes affecting component lifecycle

### 3. Connection object state
- Verify connection object remains stable after Gill transaction
- Check if any connection properties change during wallet interaction

### 4. React Query cache/key invalidation
- Query key might be getting invalidated unexpectedly
- enabled state might be changing after mutation

## Debugging Steps

- [ ] Add query enabled/disabled state logging
- [ ] Log connection object stability before/after transaction
- [ ] Test with manual refetch() commented out
- [ ] Add useQuery error state logging
- [ ] Test if polling resumes after delay or app refresh
- [ ] Compare behavior with original Anchor-based increment