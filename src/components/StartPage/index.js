import React, { useState } from "react";
import styled from "styled-components";

const StyledStartPage = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #e3b505;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  font-size: 1.8em;
  font-family: "ZCOOL QingKe HuangYou", cursive;
  border: none;
  padding: 15px 40px;
  background-color: ${props => props.active ? '#fff' : '#f5f5f5'};
  color: #95190c;
  cursor: pointer;
  border-radius: 2px;
  border-bottom: ${props => props.active ? '1px solid #ccc' : 'none'};
  border-right: ${props => props.active ? '1px solid #eee' : 'none'};
  transition: all 0.3s;

  :focus {
    outline: 0;
  }

  :hover {
    background-color: #fff;
    transform: translateY(-2px);
  }
`;

const StartPage = ({ startClick }) => {
	const [activeTab, setActiveTab] = useState('game');

	const handleGameTabClick = () => {
		// Open game in new tab
		window.open('/game', '_blank'); // Replace '/game' with your actual game route/URL
		setActiveTab('game');
		// Optional: Call startClick if you still need it for other functionality
		startClick();
	};

	return (
		<StyledStartPage>
			<TabContainer>
				<TabButton
					active={activeTab === 'game'}
					onClick={handleGameTabClick}
				>
					Game Zone
				</TabButton>
				<TabButton
					active={activeTab === 'ai'}
					onClick={() => setActiveTab('ai')}
				>
					AI Assistance
				</TabButton>
			</TabContainer>
		</StyledStartPage>
	);
};

export default StartPage;