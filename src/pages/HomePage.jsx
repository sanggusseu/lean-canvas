import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <ul>
      <li>
        <Link to="/canvas/1?keyword=hello#word">1번 게시글</Link>
      </li>
      <li>
        <Link to="/canvas/2?keyword=hello#word">2번 게시글</Link>
      </li>
      <li>
        <Link to="/canvas/3?keyword=hello#word">3번 게시글</Link>
      </li>
    </ul>
  );
}
