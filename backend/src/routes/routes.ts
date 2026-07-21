import { application, Router } from 'express';
//import adminRouter from './adminRouter';

// Auth Middleware
import { isAuthenticated,
  verifySecurityAnswer
 } from '../validators/auth'; 


// Controllers
import { 
  authCtrl,
  oAuthCtrl,
  dashCtrl,
  apiCtrl
  
} from '../controllers/control'; 


const apiRouter = Router();




// AUTHENTICATION & RECOVERY

apiRouter.post('/auth/register', authCtrl.signUp);
apiRouter.post('/auth/login', authCtrl.signIn);
apiRouter.post("/auth/google", oAuthCtrl.googleSignIn);
apiRouter.post("/auth/google/complete", oAuthCtrl.completeOAuthOnboarding);

// Password Recovery Flow
apiRouter.post('/auth/forgot-password/get-question', authCtrl.getRecoveryQuestion);
apiRouter.post('/auth/forgot-password/verify', verifySecurityAnswer);
apiRouter.post('/auth/reset-password', authCtrl.resetPassword);
apiRouter.post('/auth/update-security-question', isAuthenticated, authCtrl.addSecurityQuestion);


apiRouter.get("/metrics", dashCtrl.getDashboardMetrics);
apiRouter.post("/predict-spoilage", apiCtrl.handleFastApi);



export default apiRouter;