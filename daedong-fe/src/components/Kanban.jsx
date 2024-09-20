import styled from "styled-components";
import Kanbanimg from "../images/Kanban.png";

export const Kanban = () => (
  <KanbanWrapper>
    <KanbanImg src={Kanbanimg} alt="Kanban" />
  </KanbanWrapper>
);
const KanbanWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 300px;
`;

const KanbanImg = styled.img`
  margin-bottom: 200px;
  margin-top: 200px;
`;
