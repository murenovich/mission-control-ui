import {
  DEMO_TRENDING_ARTICLES,
  TrendingScreen,
} from '../../../lib/screens/TrendingScreen';

export default function Trending() {
  return <TrendingScreen defaultArticles={DEMO_TRENDING_ARTICLES} />;
}
