import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

/**
 * 오시는 길 정보를 표시하는 컴포넌트입니다.
 * 지도와 대중교통, 자가용 이용 방법을 안내합니다.
 *
 * @returns {JSX.Element} 오시는 길 섹션
 */
export const Location = () => {
  return (
    <>
      {/* 지도 및 주소 섹션 */}
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>

      {/* 대중교통 및 자가용 안내 섹션 */}
      <LazyDiv className="card location">
        {/* 대중교통 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            <b>[지하철 이용 시]</b>
            <br />
            <span style={{ color: '#8500dd', fontWeight: 'bold' }}>5호선 광화문역 2번 출구</span>
            <br />
            → 경복궁 방면으로 직진
            <br />
            → 대한민국 역사박물관에서 우회전
            <br />
            → 사거리 좌측 대각선 첫 번째 건물
            <br />
            <span style={{ color: '#ff6e00', fontWeight: 'bold' }}>3호선 경복궁역 6번 출구</span>
            <br />
            → 광화문 삼거리 건넌 후
            <br />
            → 광화문 열린시민마당 건너편
          </div>
          <div />
          <div className="content">
            <b>[버스 이용 시]</b>
            <br />
            <span style={{ color: '#0052a4', fontWeight: 'bold' }}>간선</span>: 103, 109, 150, 171, 272, 401, 406, 408, 606, 607, 700, 704, 706, 707, 708
            <br />
            <span style={{ color: '#00a650', fontWeight: 'bold' }}>지선</span>: 1020, 1711, 7016, 7018, 7022, 7212, 7025
            <br />
            <b>세종문화회관, KT광화문지사, 경복궁</b> 하차
            <br />
          </div>
        </div>

        {/* 자가용 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비, 티맵 등 이용
            <br />
            <b>아펠가모 광화문</b> 검색
            <br />
            {/*- 주차 요금은 무료입니다.*/}
            (주차장 이용 시 웨딩홀과 바로 연결)
          </div>
          <div />
          <div className="content">
            <b>
              {/*※ 서울대학교 정, 후문을 통과할 경우 통행료가 발생하므로
              유의바랍니다. 낙성대 방향으로 이용해주세요.*/}
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
