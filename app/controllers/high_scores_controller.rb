class HighScoresController < ApplicationController
  respond_to :json

  def index
    @high_scores = HighScore.order(score: :desc).limit(10)
    respond_with(@high_scores)
  end

  def create
    @high_score = HighScore.new(high_score_params)
    respond_with(@high_score)
  end

  private
    def high_score_params
      params.require(:high_score).permit(:score, :username)
    end
end
