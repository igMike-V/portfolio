import type { Post } from 'payload/generated-types'
import type { DevLogStyleOverrides } from './DevLogCard'
import DevLogCard from './DevLogCard'

type DevLogCardsProps = {
  devlogs: Post[],
  childStyleOverrides?: DevLogStyleOverrides,
}

export default function DevLogCards({ devlogs, childStyleOverrides }: DevLogCardsProps) {
  if (!devlogs) return null
  return (
    <>
    {devlogs.map(devlog => <DevLogCard styleOverrides={childStyleOverrides} key={devlog.id} post={devlog} />)}
    </>
  )
}