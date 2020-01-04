from django.shortcuts import redirect

def logged_in(func):
    def wrap(req, *args, **kwargs):
        if req.session.keys() >= {"mj_session"}:
            # デコレータ下の関数を実行
            return func(req, *args, **kwargs)
        return redirect('/login')

    wrap.__doc__=func.__doc__
    wrap.__name__=func.__name__
    return wrap
