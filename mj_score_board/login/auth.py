from django.shortcuts import redirect

def not_logged_in(func):
    def wrap(req, *args, **kwargs):
        if not req.session.keys() >= {"mj_session"}:
            return func(req, *args, **kwargs)
        return redirect('/')

    wrap.__doc__ = func.__doc__
    wrap.__name__ = func.__name__
    return wrap

def logged_in(func):
    def wrap(req, *args, **kwargs):
        if req.session.keys() >= {"mj_session"}:
            return func(req, *args, **kwargs)
        return redirect('/login')

    wrap.__doc__ = func.__doc__
    wrap.__name__ = func.__name__
    return wrap
