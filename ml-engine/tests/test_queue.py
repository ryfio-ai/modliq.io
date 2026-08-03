import asyncio
from concurrent.futures import ProcessPoolExecutor

process_pool = ProcessPoolExecutor(max_workers=2)

def _sample_sync_task(req: dict) -> dict:
    return {
        "success": True,
        "template_id": req.get("template_id"),
        "target": req.get("target"),
    }

def test_queue_sync_execution():
    req1 = {
        "filename": "demo_dataset.csv",
        "template_id": "yield_optimizer",
        "target": "Yield",
        "features": ["Temperature", "Pressure", "Humidity", "Speed"],
        "goal_direction": "maximize",
    }
    
    req2 = {
        "filename": "demo_dataset.csv",
        "template_id": "energy_optimization",
        "target": "Yield",
        "features": ["Temperature", "Pressure"],
        "goal_direction": "minimize",
    }

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    
    t1 = loop.run_in_executor(process_pool, _sample_sync_task, req1)
    t2 = loop.run_in_executor(process_pool, _sample_sync_task, req2)
    
    res1, res2 = loop.run_until_complete(asyncio.gather(t1, t2))
    
    assert res1.get("success") is True
    assert res2.get("success") is True
    assert res1["template_id"] == "yield_optimizer"
    assert res2["template_id"] == "energy_optimization"

if __name__ == "__main__":
    test_queue_sync_execution()
    print("Test queue sync execution passed!")
