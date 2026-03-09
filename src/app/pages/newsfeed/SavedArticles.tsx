import {
  DEMO_SAVED_ARTICLES,
  SavedArticlesScreen,
} from '../../../lib/screens/SavedArticlesScreen';

export default function SavedArticles() {
  return <SavedArticlesScreen defaultArticles={DEMO_SAVED_ARTICLES} />;
}
