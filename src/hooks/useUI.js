import { useContext } from "react";
// import { AuthContext } from '../contexts/JWTContext';
// import { AuthContext } from '../contexts/FirebaseContext';
// import { AuthContext } from '../contexts/AwsCognitoContext';
// import { AuthContext } from '../contexts/Auth0Context';
import { UIContext } from "src/ourlogic/Context/UIcontextapi";

// ----------------------------------------------------------------------

const useAuth = () => useContext(UIContext);

export default useAuth;
