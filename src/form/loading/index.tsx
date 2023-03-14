import "./style.scss";
export default function LoadingCircle({ className }: { className?: string }) {
    return (
        <div className={`lds-spinner-form ${className}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
