class HighScoresController < ApplicationController
  def index
    @high_scores = HighScore.order(score: :desc).page(1)
    render :json => @high_scores
  end

  def create
    @high_score = HighScore.new(high_score_params)
    render :json => @high_score
  end

  private
    def high_score_params
      params.require(:high_score).permit(:score, :username)
    end
end
