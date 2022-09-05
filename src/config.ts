export const config = {
  authentication_url: 'http://localhost:8083',
  signup_url: 'http://localhost:8083/signup',
  password_url: 'http://localhost:8083/password',
  oauth2_url: 'http://localhost:8083/oauth2',

  user_url: 'http://localhost:8083/users',
  user_rate_url: 'http://localhost:8083/users/rates',
  role_url: 'http://localhost:8083/roles',
  privilege_url: 'http://localhost:8080/privileges',
  audit_log_url: 'http://localhost:8080/audit-logs',
  appreciation_url: 'http://localhost:8083/appreciations/rates',
  appreciation_reply_url:'http://localhost:8083/appreciation-reply',

  article_url: 'http://localhost:8083/articles',
  article_rate_url: 'http://localhost:8083/articles/rates', 

  my_article_url: 'http://localhost:8083/my-articles',
  cinema_url: 'http://localhost:8083/cinemas',
  backoffice_cinema_url: 'http://localhost:8083/backoffice/cinemas',
  cinema_rate_url:'http://localhost:8083/cinemas/rates',
  cinema_rate_comment_url: 'http://localhost:8083/cinemas/comments',
  film_url: 'http://localhost:8083/films',
  backoffice_film_url: 'http://localhost:8083/backoffice/films',
  film_rate_url: 'http://localhost:8083/films/rates',
  film_rate_comment_url: 'http://localhost:8083/films/rates/comment',
  film_category_url: 'http://localhost:8083/films/categories',
  director_url: 'http://localhost:8083/director',
  cast_url: 'http://localhost:8083/cast',
  production_url: 'http://localhost:8083/production',
  country_url: 'http://localhost:8083/country',
  shop_url: 'http://localhost:8083/shops',
  backoffice_shop_url: 'http://localhost:8083/backoffice/shops',
  shop_rate_url: 'http://localhost:8083/shops/rates',
  shop_rate_comment_url: 'http://localhost:8083/shops/rates/comment',
  myprofile_url: 'http://localhost:8083/my-profile',
  profile_url: 'http://localhost:8083/users',
  skill_url: 'http://localhost:8083/skills',
  interest_url: 'http://localhost:8083/interests',
  looking_for_url: 'http://localhost:8083/looking-for',
  item_url: 'http://localhost:8083/items',
  item_category_url: 'http://localhost:8083/items/categories',
  brand_url: 'http://localhost:8083/brands',
  my_item_url: 'http://localhost:8083/my-items',
  item_response_url: 'http://localhost:8083/items/responses',
  item_response_comment_url: 'http://localhost:8083/items/responses/comment',

  jobs_url: 'http://localhost:8083/jobs',
  backoffice_job_url: 'http://localhost:8083/backoffice/jobs',
  saved_item:'http://localhost:8083/saved-items',
  saved_shop:'http://localhost:8083/shops/save',
  saved_film:'http://localhost:8083/films/save',
  user_follow_url:'http://localhost:8083/users',
  shop_follow_url:'http://localhost:8083/shops',
  music_url: 'http://localhost:8083/musics',
  saved_music_url: 'http://localhost:8083/saved-musics',
  saved_listsong_url: 'http://localhost:8083/saved-listsong',
  playlist_url: 'http://localhost:8083/musics/playlist',
  music_author_url: 'http://localhost:8083/musics/author',
  backoffice_music_url: 'http://localhost:8083/backoffice/musics',
  
  backoffice_room_url:'http://localhost:8083/backoffice/rooms',
  room_url:'http://localhost:8083/rooms'
};

export const env = {
  sit: {
    authentication_url: 'http://10.1.0.234:3003'
  },
  deploy: {
    authentication_url: '/server'
  }
};
