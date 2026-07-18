import { Router } from 'express';
//import adminRouter from './adminRouter';

// Auth Middleware
import { isAuthenticated,
  verifySecurityAnswer
 } from '../validators/auth'; 

// Controllers
import { 
  authCtrl, 
  
} from '../controllers/control'; 


const apiRouter = Router();




// AUTHENTICATION & RECOVERY

apiRouter.post('/auth/register', authCtrl.signUp);
apiRouter.post('/auth/login', authCtrl.signIn);

// Password Recovery Flow
apiRouter.post('/auth/forgot-password/get-question', authCtrl.getRecoveryQuestion);
apiRouter.post('/auth/forgot-password/verify', verifySecurityAnswer);
apiRouter.post('/auth/reset-password', authCtrl.resetPassword);




// ADMIN LOGIC



export default apiRouter;