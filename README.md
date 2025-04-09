#### MICHAL DECISIONS ####

1. I decided to use API Routes and not React Server Components because:
   a) this seems to be some kind of dashboard type of app, so SEO is not needed (of course it lacks 'auth' module)
   b) app is rather simple so we won't gain THAT much with RSC, but in future I would consider changing approach

2. Instead of integration / unit tests I wrote very simple Playwright E2E tests
3. Database schema is inside docker-entrypoint-initdb.d/init.sql
4. The reason I've used 'docker-compose' is that I simply always use it, so sorry that you need to exec different command :)



#### USEFUL COMMANDS ###

start app:
docker-compose up -d
pnpm dev


stop and remove docker:
docker-compose down -v


check results for tables:
docker exec -it postgres psql -U postgres -c "SELECT * FROM grades;"
docker exec -it postgres psql -U postgres -c "SELECT * FROM numbers;"
docker exec -it postgres psql -U postgres -c "SELECT * FROM school_subjects;"


run tests:
pnpm test:e2e

