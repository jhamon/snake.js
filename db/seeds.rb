require 'Faker'

ActiveRecord::Base.transaction do
  100.times do 
    username = Faker::Internet.user_name
    score = (Random.rand * 40).floor
    date = (Random.rand * 30).days.ago

    HighScore.create(username: username, score: score, created_at: date, updated_at: date)
  end
end