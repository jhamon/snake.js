class HighScoresController < ApplicationController
  # GET /high_scores
  # GET /high_scores.json
  def index
    @high_scores = HighScore.all
  end

  # GET /high_scores/new
  def new
    @high_score = HighScore.new
  end

  # POST /high_scores
  # POST /high_scores.json
  def create
    @high_score = HighScore.new(high_score_params)
    if @high_score.save
      status :ok
      render :json
    else
      head :unprocessable_entity
      render :json
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def high_score_params
      params.require(:high_score).permit(:score, :username)
    end
end
