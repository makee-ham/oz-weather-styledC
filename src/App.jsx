import useWeatherData from "./hooks/useWeatherData";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c4e8f6;
`;

const StyledSection = styled.section`
  padding: 2rem;
  text-align: center;
`;

const StyledWeatherList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const StyledWeatherCard = styled.li`
  list-style: none;
  width: 150px;
  padding: 1rem;
  border-radius: 12px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    width: 60px;
    height: 60px;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }
`;

export default function App() {
  const { data, loading, fetchError, geoError } = useWeatherData();

  const dailyForecasts = data?.list?.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  };

  // console.log(data);

  return (
    <>
      <StyledHeader>
        <h1>너의 날씨는...🌅</h1>
      </StyledHeader>
      <main>
        {geoError ? (
          <p>위치 정보를 가져오는 데 실패했다: {geoError}</p>
        ) : loading ? (
          <p>날씨 정보를 불러오는 중이다...</p>
        ) : fetchError ? (
          <p>날씨 정보를 가져오는 데 실패했다: {fetchError.message}</p>
        ) : (
          <StyledSection>
            <h2>📆 {data.city.name}의 5일간 정오 날씨 예보</h2>
            <StyledWeatherList>
              {dailyForecasts?.map((forecast, idx) => (
                <StyledWeatherCard key={idx}>
                  <h3>{formatDate(forecast.dt_txt)}</h3>
                  <img
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt={forecast.weather[0].description}
                  />
                  <p>{forecast.main.temp.toFixed(1)}°C</p>
                  <p>{forecast.weather[0].description}</p>
                </StyledWeatherCard>
              ))}
            </StyledWeatherList>
          </StyledSection>
        )}
      </main>
    </>
  );
}
