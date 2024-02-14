import GetMemberContainer from "./get-member/components/index/container.tsx";
import {getMemberApiCall} from "./get-member/components/index/api.ts";

function RegistrationLogin() {
  return (
    <div className="Input text-center">
      <h1 className="display-1">
        <span className="text-blue">Log in using email</span>
      </h1>
        {/* <GetMemberContainer getMember={getMemberApiCall}/> */}
    </div>
  );
}

export default RegistrationLogin;