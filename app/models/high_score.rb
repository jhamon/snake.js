class HighScore < ActiveRecord::Base
  validates :score, :username, :presence => true
end
