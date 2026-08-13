import io
import base64
import logging
import pandas as pd
import numpy as np

logger = logging.getLogger("modliq.ml.visualization.matplotlib")

def render_matplotlib(chart_type: str, data: list[dict], x: str | None = None, y: str | None = None, title: str | None = None) -> str | None:
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt

        df = pd.DataFrame(data)
        if df.empty:
            return None

        fig, ax = plt.subplots(figsize=(8, 4.5), dpi=100)
        fig.patch.set_facecolor('#F0F6FA')
        ax.set_facecolor('#FFFFFF')

        # Colors
        navy = '#1B2A4A'
        blue = '#2B70AB'

        if chart_type == "bar" and x in df.columns:
            val_col = y or [c for c in df.columns if c != x][0]
            ax.bar(df[x].astype(str), df[val_col], color=blue, edgecolor=navy, alpha=0.85)
            ax.set_xlabel(x, fontsize=10, fontweight='bold', color=navy)
            ax.set_ylabel(val_col, fontsize=10, fontweight='bold', color=navy)
            plt.xticks(rotation=30, ha='right')

        elif chart_type == "line" and x in df.columns:
            val_col = y or [c for c in df.columns if c != x][0]
            ax.plot(df[x].astype(str), df[val_col], color=blue, marker='o', linewidth=2)
            ax.set_xlabel(x, fontsize=10, fontweight='bold', color=navy)
            ax.set_ylabel(val_col, fontsize=10, fontweight='bold', color=navy)
            plt.xticks(rotation=30, ha='right')

        elif chart_type == "scatter" and x in df.columns and y in df.columns:
            ax.scatter(df[x], df[y], color=blue, edgecolors=navy, alpha=0.7, s=40)
            ax.set_xlabel(x, fontsize=10, fontweight='bold', color=navy)
            ax.set_ylabel(y, fontsize=10, fontweight='bold', color=navy)

        elif chart_type == "histogram" and "bin" in df.columns:
            ax.bar(df["bin"].astype(str), df["count"], color=blue, edgecolor=navy)
            ax.set_xlabel("Bins", fontsize=10, fontweight='bold', color=navy)
            ax.set_ylabel("Count", fontsize=10, fontweight='bold', color=navy)
            plt.xticks(rotation=35, ha='right')

        else:
            # Fallback bar chart
            c1 = df.columns[0]
            c2 = df.columns[1] if len(df.columns) > 1 else df.columns[0]
            ax.bar(df[c1].astype(str).head(15), pd.to_numeric(df[c2], errors='coerce').fillna(0).head(15), color=blue)

        title_str = title or f"{chart_type.upper()} Export"
        ax.set_title(title_str, fontsize=12, fontweight='bold', color=navy, pad=12)
        ax.grid(True, linestyle='--', alpha=0.4, color='#D0E2F0')

        plt.tight_layout()
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        plt.close(fig)
        buf.seek(0)
        return base64.b64encode(buf.read()).decode('utf-8')
    except Exception as err:
        logger.error(f"Matplotlib export error: {err}")
        return None
