import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

    const renderRating = (diem: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= diem) {
                stars.push(<StarFill key={i} style={{ color: "#6f42c1" }} />);
            } else if (i - 0.5 <= diem) {
                stars.push(<StarHalf key={i} style={{ color: "#6f42c1" }} />);
            } else {
                stars.push(<Star className="text-secondary" key={i} />);
            }
        }
        return stars;
    }

    export default renderRating;