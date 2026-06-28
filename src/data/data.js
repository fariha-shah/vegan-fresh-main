import broccoliImg from '../assets/images/broccoli.png';
import carrotImg from '../assets/images/carrot.png';
import tomatoImg from '../assets/images/tomato.png';
import onionImg from '../assets/images/onion.png';
import lettuceImg from '../assets/images/cat-lettuce.png';
import farmingImg from '../assets/images/cucumber.png';

export const BLOGS = [
  {
    id: 1,
    title: '5 Benefits of Eating Organic Vegetables',
    excerpt:
      'Organic vegetables are grown without harmful chemicals. They are healthier, tastier and better for the environment.',
    image: broccoliImg,
    date: 'June 10, 2026',
    tag: 'Health Tips',
    tagColor: '#dcfce7',
    tagText: '#166534',
    content: [
      {
        heading: 'No Harmful Chemicals',
        body: 'Organic vegetables are grown without pesticides.',
      },
      {
        heading: 'Better Nutrition',
        body: 'They contain more vitamins and minerals.',
      },
    ],
  },

  {
    id: 2,
    title: 'How to Store Vegetables Fresh',
    excerpt: 'Learn the best ways to store your vegetables so they stay fresh.',
    image: carrotImg,
    date: 'June 12, 2026',
    tag: 'Tips',
    tagColor: '#fef9c3',
    tagText: '#854d0e',
    content: [
      {
        heading: 'Keep Them Cool',
        body: 'Store in fridge at proper temperature.',
      },
    ],
  },

  {
    id: 3,
    title: 'Easy Vegetable Recipes for Families',
    excerpt: 'Quick and delicious recipes using fresh vegetables.',
    image: tomatoImg,
    date: 'June 14, 2026',
    tag: 'Recipes',
    tagColor: '#fee2e2',
    tagText: '#991b1b',
    content: [],
  },

  {
    id: 4,
    title: 'Why Seasonal Vegetables Are Best',
    excerpt: 'Eating seasonal vegetables gives better taste.',
    image: onionImg,
    date: 'June 15, 2026',
    tag: 'Farming',
    tagColor: '#e0f2fe',
    tagText: '#075985',
    content: [],
  },

  {
    id: 5,
    title: 'Top 10 Vegetables for Weight Loss',
    excerpt: 'Low calories vegetables for weight loss.',
    image: lettuceImg,
    date: 'June 16, 2026',
    tag: 'Health Tips',
    tagColor: '#dcfce7',
    tagText: '#166534',
    content: [],
  },

  {
    id: 6,
    title: 'How We Grow Our Vegetables',
    excerpt: 'Behind the scenes farming process.',
    image: farmingImg,
    date: 'June 16, 2026',
    tag: 'Farming',
    tagColor: '#e0f2fe',
    tagText: '#075985',
    content: [],
  },
];
