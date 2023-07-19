'use client'
import { useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './test.css'
const ResponsiveReactGridLayout = WidthProvider(Responsive)
const layouts_init = {
  lg: [
    { i: 'a', x: 0, y: 0, w: 4, h: 1 },
    { i: 'b', x: 4, y: 0, w: 4, h: 2 },
    { i: 'c', x: 8, y: 0, w: 4, h: 3 },
    { i: 'd', x: 12, y: 0, w: 4, h: 4 },
    { i: 'e', x: 16, y: 0, w: 4, h: 5 },
  ],
}
/*
rowHeight属性用于设置每一行的高度
-y属性表示网格项的起始行
-h属性表示网格项占用的行数
-x属性表示网格项的起始列
-w属性表示网格项占用的列数
*/
// 10
// 1 10 10*1+10*(1-1)=10
// 2 30 10*2+10*(2-1)=30
// 3 50 10*3+10*(3-1)=50
// 4 70 10*4+10*(4-1)=70
// 5 90 10*5+10*(5-1)=90
// 实际高度与margin、rowHeight、h有关，高度h中间夹了h-1个margin，所以实际高度为h*rowHeight+(h-1)*margin[1]
function Test() {
  const [editing, setEditing] = useState(false)
  const [layouts, setLayouts] = useState(layouts_init)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const onLayoutChange = (layout: any, layouts: any) => {
    setLayouts({ ...layouts })
  }
  const onDrop = (layout: any, layoutItem: any, _ev: any) => {
    // 外部拖拽放置
  }
  const onBreakpointChange = (breakpoint: any) => {
    // 响应式断点改变
  }
  return (
    <div className="w-full h-full bg-white">
      <button
        onClick={() => {
          setEditing(!editing)
          //   const newVal = handleDrag(layouts, editing)
          //   console.log(newVal, '数据😎😎😎newVal')
          //   setLayouts(handleDrag(layouts, editing))
        }}
      >
        编辑
      </button>
      <div
        className="h-[600px] mx-auto bg-[#f4f5fa] relative overflow-y-auto"
        style={{ width: 'calc(100% - 100px' }}
      >
        <ResponsiveReactGridLayout
          className="w-full h-full min-h-full"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 20, md: 20, sm: 20, xs: 20 }} // 每行的列数,统一以后，每个元素的宽度都是100/100=1
          measureBeforeMount={false} // 如果为true，则在挂载之前计算元素的位置。这对于SSR很有用。
          rowHeight={10} // 每行的高度
          margin={[10, 10]} // 每个元素之间的间隔
          containerPadding={[10, 10]} // 容器内边距，两个边距都为0以后，y、h还有rowHeight高度结合才符合预期
          isResizable={editing} // 是否可调整大小
          isDraggable={editing}
          resizeHandles={['se']} // 只允许右下角拖动
          compactType={'vertical'} // horizontal水平紧凑，vertical垂直紧凑型
          useCSSTransforms={mounted} // 硬件加速，提高性能
          preventCollision={false} // 防止碰撞
          isDroppable={true} // 是否可放置
          onLayoutChange={onLayoutChange} // 布局改变时触发
          onDrop={onDrop} // 放置方法
          onBreakpointChange={onBreakpointChange} // 响应式断点改变时触发
        >
          {layouts.lg.map((item: any) => {
            return (
              <div key={item.i} className="bg-white">
                {item.i}
              </div>
            )
          })}
        </ResponsiveReactGridLayout>
      </div>
    </div>
  )
}

export default Test
