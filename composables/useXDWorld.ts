import { ref } from 'vue'

// GLOBAL 선언
declare const GLOBAL: {
  positions: number[][],
  values: number[],
  statistic: any
}

// 전역 인터페이스 선언
declare global {
  interface Window {
    setXDWorldReady?: (value: boolean) => void
    setProgressCallback?: (percent: string, seconds: string) => void
  }
}

// XDWorld 초기화 상태 관리
const isXDWorldReady = ref(false)

// 마커 시각화
function loadPositionData(shapeType: string) {
  // @ts-ignore
  const statistic = window.Module?.getStatistic?.()
  if (!statistic) {
    console.warn('🛑 XDWorld가 아직 초기화되지 않았거나 Statistic 객체 없음')
    return
  }

  statistic.removeAll()

  if (shapeType === 'symbol') {
    loadLargeSymbol('./3ds/tree.3ds')
    return
  }

  if (shapeType === 'icon') {
    loadIconType('./markers/config_users.png')
    return
  }

  const dataInfo = {
    objects: [
      {
        key: 'Test',
        dataType: 'position',
        type: 'instanced',
        shape: shapeType,
        points: GLOBAL.positions,
        value: GLOBAL.values,
        weight: [1, 1, 1]
      }
    ]
  }

  const json = JSON.stringify(dataInfo)
  statistic.createByJSON(json)
}

// 마커 제거 함수 추가
function removeAllMarkers() {
  // @ts-ignore
  const statistic = window.Module?.getStatistic?.()
  if (!statistic) return
  statistic.removeAll()
}

// CSV 파싱 함수 (엔진 함수 호출)
function parseLargeCSV(type: number) {
  // @ts-ignore
  window.parseLargeCSV?.(type)
}

// 아이콘 마커 렌더링
function loadIconType(path: string) {
  fetch(path)
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const bytes = new Uint8Array(buffer)
      let binary = ''
      for (let b of bytes) binary += String.fromCharCode(b)
      const base64 = btoa(binary)

      // @ts-ignore
      const statistic = window.Module?.getStatistic?.()
      if (!statistic) return

      const dataInfo = {
        objects: [
          {
            key: 'Test',
            dataType: 'position',
            type: 'instanced',
            shape: 'icon',
            points: GLOBAL.positions,
            value: GLOBAL.values,
            weight: [1, 1, 1],
            image: { base64 }
          }
        ]
      }

      statistic.createByJSON(JSON.stringify(dataInfo))
    })
}

// 심볼 마커 렌더링
function loadLargeSymbol(path: string) {
  fetch(path)
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const bytes = new Uint8Array(buffer)
      let binary = ''
      for (let b of bytes) binary += String.fromCharCode(b)
      const base64 = btoa(binary)

      // @ts-ignore
      const statistic = window.Module?.getStatistic?.()
      if (!statistic) return

      const dataInfo = {
        objects: [
          {
            key: 'Test',
            dataType: 'position',
            type: 'instanced',
            shape: 'symbol',
            points: GLOBAL.positions,
            value: GLOBAL.values,
            weight: [1, 1, 1],
            symbol: { data: base64, type: '3ds' }
          }
        ]
      }

      statistic.createByJSON(JSON.stringify(dataInfo))
    })
}

// 진행률 콜백 연결
function setProgressCallback(cb: (percent: string) => void) {
  if (typeof window !== 'undefined') {
    window.setProgressCallback = cb
  }
}

// XDWorld 초기화 완료 시 호출될 전역 함수 등록
if (typeof window !== 'undefined') {
  window.setXDWorldReady = (value: boolean) => {
    isXDWorldReady.value = value
  }
}

// composable 반환
export function useXDWorld() {
  return {
    isXDWorldReady,
    loadPositionData,
    parseLargeCSV,
    removeAllMarkers,
    setProgressCallback
  }
}