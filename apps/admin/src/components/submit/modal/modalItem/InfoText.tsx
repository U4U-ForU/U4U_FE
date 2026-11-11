import styled from "@emotion/styled";
import SubText from "./SubText";

interface InfoTextProps {
  date: string;
  userName: string;
}

export default function InfoText({ date, userName }: InfoTextProps) {
  return (
    <Info>
      <SubText text={`${date} 제출됨`} />
      <SubText text={`@${userName}`} />
    </Info>
  );
}

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;
