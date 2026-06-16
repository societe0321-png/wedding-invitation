import { useEffect, useRef } from "react"
import patelUrl from "../../icons/snowflake.png"

// ❄️ 눈송이가 자연스럽게 수직으로 떨어지도록 속도 조정
const X_SPEED = 0.1
const X_SPEED_VARIANCE = 0.4

const Y_SPEED = 0.4
const Y_SPEED_VARIANCE = 0.4

const FLIP_SPEED_VARIANCE = 0.002

/**
 * 개별 눈송이 객체를 관리하는 클래스입니다.
 */
class Petal {
  x: number
  y: number
  w: number = 0
  h: number = 0
  opacity: number = 0
  flip: number = 0
  xSpeed: number = 0
  ySpeed: number = 0
  flipSpeed: number = 0

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private petalImg: HTMLImageElement,
  ) {
    // 초기 위치 무작위 설정
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height * 2 - canvas.height

    this.initialize()
  }

  /**
   * ❄️ 눈송이의 크기, 투명도, 속도 등을 무작위로 초기화합니다.
   */
  initialize() {
    // 가로·세로를 하나의 크기(size)로 통일하여 완벽한 정사각형 비율 유지
    const size = 15 + Math.random() * 20 // 눈송이 크기 다양화 (최소 15px ~ 최대 35px)
    this.w = size
    this.h = size
    this.opacity = this.w / 50 // 크기가 클수록 조금 더 선명하게 연출
    this.flip = Math.random()

    this.xSpeed = X_SPEED + Math.random() * X_SPEED_VARIANCE
    this.ySpeed = Y_SPEED + Math.random() * Y_SPEED_VARIANCE
    this.flipSpeed = Math.random() * FLIP_SPEED_VARIANCE
  }

  /**
   * 화면에 눈송이를 그립니다.
   */
  draw() {
    // 화면 밖으로 나갔을 경우 초기화 및 재배치
    if (this.y > this.canvas.height || this.x > this.canvas.width) {
      this.initialize()

      const rand = Math.random() * (this.canvas.width + this.canvas.height)
      if (rand > this.canvas.width) {
        this.x = 0
        this.y = rand - this.canvas.width
      } else {
        this.x = rand
        this.y = 0
      }
    }
    this.ctx.globalAlpha = this.opacity
    
    // 💡 [수정 완료] 이미지 비율이 깨지지 않게 원본(this.w, this.h) 그대로 그리도록 수식을 걷어냈습니다.
    this.ctx.drawImage(
      this.petalImg,
      this.x,
      this.y,
      this.w,
      this.h,
    )
  }

  /**
   * 눈송이의 위치를 업데이트하고 다시 그립니다.
   */
  animate() {
    this.x += this.xSpeed
    this.y += this.ySpeed
    this.flip += this.flipSpeed
    this.draw()
  }
}

/**
 * 배경에 눈송이가 내리는 애니메이션 효과를 주는 컴포넌트입니다.
 *
 * @returns {JSX.Element} 배경 효과 컴포넌트
 */
export const BGEffect = () => {
  const ref = useRef<HTMLCanvasElement>({} as HTMLCanvasElement)
  const petalsRef = useRef<Petal[]>([])
  const resizeTimeoutRef = useRef(0)
  const animationFrameIdRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    const petalImg = new Image()
    petalImg.src = patelUrl

    /**
     * 화면 크기에 따른 적절한 눈송이 개수를 계산합니다.
     */
    const getPetalNum = () => {
      return Math.floor((window.innerWidth * window.innerHeight) / 30000)
    }

    /**
     * 눈송이들을 생성하고 초기화합니다.
     */
    const initializePetals = () => {
      const count = getPetalNum()
      const petals = []
      for (let i = 0; i < count; i++) {
        petals.push(new Petal(canvas, ctx, petalImg))
      }
      petalsRef.current = petals
    }

    initializePetals()

    /**
     * 매 프레임마다 눈송이를 렌더링합니다.
     */
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petalsRef.current.forEach((petal) => petal.animate())
      animationFrameIdRef.current = requestAnimationFrame(render)
    }

    render()

    /**
     * 화면 크기 변경 시 캔버스 크기를 조정하고 눈송이 개수를 조절합니다.
     */
    const onResize = () => {
      clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = window.setTimeout(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const newPetalNum = getPetalNum()
        if (newPetalNum > petalsRef.current.length) {
          for (let i = petalsRef.current.length; i < newPetalNum; i++) {
            petalsRef.current.push(new Petal(canvas, ctx, petalImg))
          }
        } else if (newPetalNum < petalsRef.current.length) {
          petalsRef.current.splice(newPetalNum)
        }
      }, 100)
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animationFrameIdRef.current)
    }
  }, [])

  return (
    <div className="bg-effect">
      <canvas ref={ref} />
    </div>
  )
}
