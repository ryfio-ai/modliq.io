import io
import base64
import logging
import pandas as pd
import numpy as np

logger = logging.getLogger("modliq.ml.visualization.seaborn")

def render_seaborn(chart_type: str, data: list[dict], x: str | None = None, y: str | None = None, title: str | None = None) -> str | None:
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        import seaborn as sns

        df = pd.DataFrame(data)
        if df.empty:
            return None

        sns.set_theme(style="whitegrid")
        fig, ax = plt.subplots(figsize=(8, 4.5), dpi=100)

        navy = '#1B2A4A'
        blue = '#2B70AB'

        if chart_type == "heatmap" and "x" in df.columns and "y" in df.columns and "value" in df.columns:
            pivot_df = df.pivot(index="y", columns="x", values="value")
            sns.heatmap(pivot_df, annot=True, fmt=".2f", cmap="Blues", ax=ax, cbar=True)
            ax.set_title(title or "Correlation Matrix Heatmap", fontsize=12, fontweight="bold", color=navy)

        elif chart_type == "boxplot":
            val_col = y or (df.select_dtypes(include=[np.number]).columns[0] if not df.select_dtypes(include=[np.number]).empty else None)
            if val_col:
                sns.boxplot(y=df[val_col], x=df[x] if x in df.columns else None, ax=ax, color=blue)
                ax.set_title(title or f"Boxplot Summary for {val_col}", fontsize=12, fontweight="bold", color=navy)

        else:
            # Fallback barplot
            c1 = x or df.columns[0]
            c2 = y or (df.columns[1] if len(df.columns) > 1 else df.columns[0])
            sns.barplot(data=df.head(15), x=c1, y=c2, ax=ax, palette="mako")
            ax.set_title(title or f"{chart_type.capitalize()} Plot", fontsize=12, fontweight="bold", color=navy)

        plt.tight_layout()
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        plt.close(fig)
        buf.seek(0)
        return base64.b64encode(buf.read()).decode('utf-8')
    except Exception as err:
        logger.error(f"Seaborn export error: {err}")
        return None
