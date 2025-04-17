// constants/geometryOptions.ts

// 1. 사용할 수 있는 마커 타입들만 한정해서 타입 정의
export type MarkerType =
  | 'none'
  | 'point'
  | 'circle'
  | 'vertical_line'
  | 'cylinder'
  | 'sphere'
  | 'cone'
  | 'symbol'
  | 'icon'

// 2. 각 옵션이 어떤 형태인지 인터페이스 정의
export interface GeometryOption {
  value: MarkerType
  label: string
}

// 3. 실제 마커 타입 옵션 목록
export const geometryOptions: GeometryOption[] = [
  { value: 'none', label: '선택 안함' },
  { value: 'point', label: '점' },
  { value: 'circle', label: '원' },
  { value: 'vertical_line', label: '수직선' },
  { value: 'cylinder', label: '실린더' },
  { value: 'sphere', label: '구' },
  { value: 'cone', label: '콘' },
  { value: 'symbol', label: '심볼' },
  { value: 'icon', label: '아이콘' }
]
