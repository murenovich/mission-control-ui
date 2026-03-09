import {
  DEMO_NEWSFEED_ARTICLES,
  NewsfeedScreen,
} from '../../lib/screens/NewsfeedScreen';

export default function Newsfeed() {
  return <NewsfeedScreen defaultArticles={DEMO_NEWSFEED_ARTICLES} />;
}
