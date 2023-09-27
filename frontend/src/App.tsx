import GetMemberContainer from "./get-member/components/index/container.tsx";
import {getMemberApiCall} from "./get-member/components/index/api.ts";

function App() {
  return (
    <div className="Input text-center">
      <h1 className="display-1">
        read<span className="text-blue">メイ</span>
      </h1>
        <GetMemberContainer getMember={getMemberApiCall}/>
    </div>
  );
}

export default App;
