import { getMemberApiCall } from "./tool-pages/user-search/index/api.ts";
import GetMemberContainer from "./tool-pages/user-search/index/container.tsx";

function App() {
  return (
    // Configure home page here by setting it so some tool page component
    <GetMemberContainer getMember={getMemberApiCall}/>
  );
}

export default App;
