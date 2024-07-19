npm install
npm cache clean --force
npm run build
pm2 delete vidpod
pm2 start npm --name vidpod -- run serve