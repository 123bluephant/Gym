function MetricsCard({ metrics }: { metrics: Array<{ value: React.ReactNode; label: React.ReactNode }> }) {
    return (
        <div style={{
            display: "flex",
            gap: 20,
            marginBottom: 20
        }}>
            {metrics.map((metric: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, idx: React.Key | null | undefined) => (
                <div key={idx} style={{
                    background: "#f6f8fa",
                    borderRadius: 10,
                    flex: 1,
                    padding: 20,
                    textAlign: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                }}>
                    <div style={{ fontSize: 28, fontWeight: "bold", color: "#0984e3" }}>{metric.value}</div>
                    <div style={{ fontSize: 14, color: "#636e72" }}>{metric.label}</div>
                </div>
            ))}
        </div>
    );
}
export default MetricsCard;
