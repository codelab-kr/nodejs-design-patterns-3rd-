brew install nginx

To start nginx now and restart at login:
  brew services start nginx
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/nginx/bin/nginx -g daemon\ off\;


nginx -c ${PWD}/nginx.conf # 의도대로 작동하지 않음
