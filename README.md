# SWR Infinite Scroll

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> An easier way to `useSWRInfinite`

SWR provides an amazing way to manage paged data through `useSWRInfinite`. But it's not as intuitive when it comes to implementing infinite scroll itself. `react-swr-infinite-scroll` attempts to solve this by implementing it for you. Using the `IntersectionObserver` API, it detects whether the viewport has reached the _end of the list view_ to decide if the data has to be reloaded.

## Demo

Visit the demo storybook [here](https://react-swr-infinite-scroll.vercel.app/).

## Features

- Seamless useSWRInfinite integration
- Awesome TypeScript completion
- InfiniteScroll (of course)
- Horizontal InfiniteScroll
- Customizable loading & ending indicator
- Customizable triggering behavior (offset)

## Installation

```shell
yarn add react-swr-infinite-scroll
```
or
```shell
npm install --save react-swr-infinite-scroll
```

## Usage

> tldr; You will still `useSWRInfinite`, while the state management is done by the `InfiniteScroll` component in the render

What you'll need to implement/know:
- Some way to **load paged data**
- Some way to load the **next paged data**
- Some way to **detect** that the paged data is **reaching its end**
- Some way to **render** the list of paged data

```jsx
const Component: React.FC = () => {
    const swr = useSWRInfinite(/* implement SWR here*/)
    return <InfiniteScroll
                swr={swr}
                loadingIndicator="Loading..."
                isReachingEnd={/* implement ending detection here */}>
        {response => /* implement render here */}
    </InfiniteScroll>
}
```

### Props

```typescript
type Props<T> = {
  swr: SWRInfiniteResponse<T>;
  children: React.ReactChild | ((item: T) => React.ReactNode);
  loadingIndicator?: React.ReactNode;
  endingIndicator?: React.ReactNode;
  isReachingEnd: boolean | ((swr: SWRInfiniteResponse<T>) => boolean);
  offset?: number;
};
```

- `swr`: pass your `useSWRInfinite` hook here
- `children`: could either be a regular react child that uses the data from the original swr object itself, or a function that renders the list items passed from the `InfiniteScroll` component
- `isReachingEnd`: A function / boolean value to tell if the list is reaching its end (see examples for a better idea of how `isReachingEnd` should be implemented)
- (optional) `loadingIndicator`: A react node to be displayed when the list is loading
- (optional) `endingIndicator`: A react node to be displayed when the list is reaching its end
- (optional) `offset`
  - if set to a positive value, the reload trigger will be called when the end of the list is behind the viewport
  - if set to a negative value, the reload trigger will be called when the end of the list is ahead of the viewport

## Examples

### GitHub Issues

Borrowed from [this example](https://swr.vercel.app/examples/infinite-loading) by SWR

```jsx

const PAGE_SIZE = 5;

export const GitHub: React.FC = () => {

  const swr = useSWRInfinite(
    (index, prev) =>
      `https://api.github.com/repos/reactjs/react-a11y/issues?per_page=${PAGE_SIZE}&page=${
        index + 1
      }`,
    {
      fetcher: async (key) => fetch(key).then((res) => res.json()),
    }
  );

  return (
      <div style={{ maxWidth: '400px'}}>
        <InfiniteScroll
          swr={swr}
          loadingIndicator="Loading..."
          endingIndicator="No more issues! 🎉"
          isReachingEnd={(swr) =>
            swr.data?.[0]?.length === 0 || swr.data?.[swr.data?.length - 1]?.length < PAGE_SIZE
          }
        >
          {(response) =>
            response?.map((issue) => (
              <div
                key={issue.id}
                style={{
                  padding: '20px',
                  borderRadius: '8px',
                  border: 'solid #ccc 1px',
                  margin: '20px auto',
                }}
              >
                <div style={{ fontWeight: 700 }}>{issue.title}</div>
                <div style={{ color: '#aaa', marginTop: '8px' }}>
                  {issue.user.login} • {new Date(issue.created_at).toDateString()}
                </div>
              </div>
            ))
          }
        </InfiniteScroll>
    </div>
  );
};
```

More examples can be found in the storybook documentation. You can clone this repo locally and run
```shell
yarn 
yarn storybook
```
to view them

## Feedback

Issues and pull requests are welcome! Feel free to leave any major/minor feedback through the repo page.

## License

> It's MIT as usual

Copyright 2021 Eunsoo Shin (esinx)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

