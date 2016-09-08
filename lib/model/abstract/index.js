class abstract {

  constructor(models, request){
    this.models = models;
    this.request = request;
  }

  successAction(request, response){
    request.flash('notice', 'Success Message!');
    response.redirect('/');
  }

  failureAction(request, response, error){
    request.flash('error', error);
    response.redirect('/');
  }

}

module.exports = abstract;
