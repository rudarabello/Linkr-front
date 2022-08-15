import styled from "styled-components"
import ReactTooltip from '@huner2/react-tooltip';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { likeDislikeRequest } from "../../services/apiRequests";
import { usePosts } from "../../providers/PostsProvider";
import { useAuth } from "../../providers/AuthProvider";
import { alert } from "../../Helpers/alert";

export const Likes = ({ id, likes }) => {
    console.log(likes)
    const { userData, logout } = useAuth();
    const { setHasUpdate } = usePosts();
    const handleLikeDislike = async () => {
        try {
            await likeDislikeRequest(id);
            setHasUpdate(update => !update);
        } catch (error) {
            let message = err.response.data;
            if (message = 'Unauthorized') {
                return logout();
            }
            alert('error', 'An error has occurred, try again!', message)
        }
    };

    const buildTooltipMessage = (users) => {
        const numberOfLikes = users.length;
        const userLiked = users.map((user) => user.id).includes(userData.id);
        if (numberOfLikes === 0) return 'Be the first to like this post';
        if (userLiked) {
            return numberOfLikes === 1
                ? 'You'
                : `You, ${users[0].username} and other 
                    ${numberOfLikes - 2} people`;
        } else {
            return numberOfLikes === 1
                ? `${users[0].username}`
                : `${users[0].username}, ${users[1].username} and other ${numberOfLikes - 2
                } people`;
        }
    };
    const tooltipMessage = buildTooltipMessage(likes);
    const renderIonIcon = likes.map((like) => like.id).includes(userData.id) ? (
        <AiFillHeart
            onClick={handleLikeDislike}
            size={20}
            style={{
                color: '#AC0000',
                width: '25px',
                height: '25px',
                marginBottom: '5px',
                cursor: 'pointer',
            }}
        />
    ) : (
        <AiOutlineHeart
            onClick={handleLikeDislike}
            style={{
                color: '#fff',
                width: '25px',
                height: '25px',
                marginBottom: '5px',
                cursor: 'pointer',
            }}
        />
    );

    return (
        <>
            {renderIonIcon}
            <Like data-tip={tooltipMessage}>
                {likes.length} {likes.length === 1 ? 'like' : 'likes'}
            </Like>
            <ReactTooltip place='bottom' type='light' effect='solid' />
        </>
    )
}


const Like = styled.p`
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;

  @media screen and (max-width: 768px) {
    font-size: 9px;
    line-height: 11px;
  }
`;