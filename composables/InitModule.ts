// XDWorld 엔진 초기화만
import { ref } from 'vue'
export const isXDWorldReady = ref(false)

export function initXDWorld() {
  return new Promise<void>((resolve) => {
    const Module = {
      postRun: [() => {
        console.log('🧭 XDWorld init 완료')
        isXDWorldReady.value = true
        resolve()
      }],
      canvas: (() => {
        const canvas = document.createElement('canvas')
        canvas.id = 'canvas'
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        canvas.setAttribute('tabindex', '-1')
        document.body.appendChild(canvas)
        return canvas
      })()
    }

    // @ts-ignore
    window.Module = Module
    const script = document.createElement('script')
    script.src = '/js/XDWorldEM.js'
    document.head.appendChild(script)
  })
}
