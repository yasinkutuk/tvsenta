require 'test_helper'

class ChartsControllerTest < ActionController::TestCase
  setup do
    @chart = charts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:charts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create chart" do
    assert_difference('Chart.count') do
      post :create, chart: { direction: @chart.direction, exchange_id: @chart.exchange_id, image_url: @chart.image_url, interval: @chart.interval, pair_id: @chart.pair_id, timestamp: @chart.timestamp, title: @chart.title, tv_id: @chart.tv_id, url: @chart.url, user_id: @chart.user_id }
    end

    assert_redirected_to chart_path(assigns(:chart))
  end

  test "should show chart" do
    get :show, id: @chart
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @chart
    assert_response :success
  end

  test "should update chart" do
    patch :update, id: @chart, chart: { direction: @chart.direction, exchange_id: @chart.exchange_id, image_url: @chart.image_url, interval: @chart.interval, pair_id: @chart.pair_id, timestamp: @chart.timestamp, title: @chart.title, tv_id: @chart.tv_id, url: @chart.url, user_id: @chart.user_id }
    assert_redirected_to chart_path(assigns(:chart))
  end

  test "should destroy chart" do
    assert_difference('Chart.count', -1) do
      delete :destroy, id: @chart
    end

    assert_redirected_to charts_path
  end
end
