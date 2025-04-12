import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService.js'
import BaseController from '../utils/BaseController.js'
import { trackedBugService } from '../services/TrackedBugService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use((request,response,next) => {
        console.log('Running Bug Middleware');
        next()
       })
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      .get('/trackedbugs', this.getBugsYouAreTracking)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

   async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getBugsYouAreTracking(request, response, next){
    try {
      const userId = request.userInfo.id
      console.log('My Bugs? :', userId)
      const bugs = await trackedBugService.getBugsYouAreTracking(userId)
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }
  
}
