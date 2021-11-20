import { useContext } from "react";
// import { AuthContext } from '../contexts/JWTContext';
// import { AuthContext } from '../contexts/FirebaseContext';
// import { AuthContext } from '../contexts/AwsCognitoContext';
// import { AuthContext } from '../contexts/Auth0Context';
import { AuthContext } from "src/ourlogic/Context/MagicContext";

// ----------------------------------------------------------------------

const useAuth = () => useContext(AuthContext);

export default useAuth;
