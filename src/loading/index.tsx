import "./style.css";
export default function LoadingCircle({className}:{className?:string}) {
    return (
        <div className={`lds-spinner ${className}`}>
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
