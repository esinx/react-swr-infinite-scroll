import React from 'react'
import { useSWRInfinite } from 'swr'
import InfiniteScroll from '.'
import LoadingIndicator from './LoadingIndicator'

export default {
  title: 'InfiniteScroll/Picsum',
  component: InfiniteScroll,
  parameters: {
    layout: 'fullscreen',
  },
}

type PicsumItem = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

type PicsumResponse = PicsumItem[]

export const Picsum: React.FC = () => {
  const PAGE_SIZE = 5

  const swr = useSWRInfinite<PicsumResponse>(
    (index, prev) => `https://picsum.photos/v2/list?page=${index + 1}&limit=${PAGE_SIZE}`,
    {
      fetcher: async (key) => fetch(key).then((res) => res.json()),
    }
  )

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <InfiniteScroll
        swr={swr}
        loadingIndicator={<LoadingIndicator style={{ margin: '30px' }} />}
        isReachingEnd={(swr) =>
          swr.data?.[0]?.length === 0 || (swr.data?.[swr.data?.length - 1]?.length ?? 0) < PAGE_SIZE
        }
      >
        {(response) =>
          response?.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  flex: 1,
                  minWidth: '500px',
                  background: `url(${item.download_url}) center center no-repeat`,
                  backgroundSize: 'cover',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '32px',
                    background: 'linear-gradient(#00000000, #00000088)',
                  }}
                >
                  <div style={{ color: '#ffffffaa', fontSize: '14px' }}>
                    {item.width} x {item.height}
                  </div>
                  <div style={{ color: 'white', fontSize: '18px' }}>{item.author}</div>
                  <div style={{ color: 'white', fontSize: '14px' }}>{item.url}</div>
                </div>
              </div>
            )
          })
        }
      </InfiniteScroll>
    </div>
  )
}

;(Picsum as any).storyName = 'Picsum (Horizontal Scrolling)'
